package ChooseFile;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.FileVisitResult;
import java.nio.file.FileVisitor;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.annotation.SuppressLint;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;

import androidx.documentfile.provider.DocumentFile;

import com.google.android.gms.common.logging.Logger;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class FileHelper {
    private static final String DEFAULT_DIR_NAME = "AmoFromTaiwan";
    private static final int DEFAULT_BUFFER_SIZE = 1024;
    private static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");
    private static final int EOF = -1;
    private static FileHelper INSTANCE = new FileHelper();

    public static FileHelper getInstance() {
        return INSTANCE;
    }

    private boolean isExternalStorageWritable(Context context) {
    /*
    String state = Environment.getExternalStorageState();
    return Environment.MEDIA_MOUNTED.equals(state);
    */
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (context.checkSelfPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
                return true;
            } else {
                Log.e("DEVK","!!! checkSelfPermission() not granted");
                return false;
            }
        } else { //permission is automatically granted on sdk<23 upon installation
            return true;
        }
    }

    private boolean isExternalStorageReadable(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (context.checkSelfPermission(android.Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
                return true;
            } else {
                Log.e("DEVK","!!! checkSelfPermission() not granted");
                return false;
            }
        } else { //permission is automatically granted on sdk<23 upon installation
            return true;
        }
    }

    @SuppressLint("SimpleDateFormat")
    private String generateFileNameBasedOnTimeStamp() {
        return new SimpleDateFormat("yyyyMMdd_hhmmss").format(new Date()) + ".jpeg";
    }

    @SuppressLint("LongLogTag")
    public File createExternalFile(String dir_name, String file_name, Context context) {
        String dir_path;
        String file_path;
        File dir;
        File file;
        if (!isExternalStorageWritable(context)) {
            Log.e("DEVK","!!! external storage not writable");
            return null;
        }
        if (dir_name == null) {
            dir_path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getAbsolutePath() + File.separator + DEFAULT_DIR_NAME;
        } else {
            dir_path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getAbsolutePath() + File.separator + dir_name;
        }
        Log.d("... going to access an external dir:" , dir_path);
        dir = new File(dir_path);
        if (!dir.exists()) {
            Log.d("... going to mkdirs:" , dir_path);
            if (!dir.mkdirs()) {
                Log.e("DEVK","!!! failed to mkdirs");
                return null;
            }
        }
        if (file_name == null) {
            file_path = dir_path + File.separator + generateFileNameBasedOnTimeStamp();
        } else {
            file_path = dir_path + File.separator + file_name;
        }
        Log.d("... going to return an external dir:" , file_path);
        file = new File(file_path);
        if (file.exists()) {
            Log.d("... before creating to delete an external dir:" , file.getAbsolutePath());
            if (!file.delete()) {
                Log.e("DEVK","!!! failed to delete file");
                return null;
            }
        }
        return file;
    }

    @SuppressLint("LongLogTag")
    public File createInternalFile(String dir_name, String file_name, Context context) {
        String dir_path;
        String file_path;
        File dir;
        File file;
        if (dir_name == null) {
            dir = new ContextWrapper(context).getDir(DEFAULT_DIR_NAME, Context.MODE_PRIVATE);
        } else {
            dir = new ContextWrapper(context).getDir(dir_name, Context.MODE_PRIVATE);
        }
        dir_path = dir.getAbsolutePath();
        Log.d("... going to access an internal dir:" , dir_path);
        if (!dir.exists()) {
            Log.d("... going to mkdirs:" , dir_path);
            if (!dir.mkdirs()) {
                Log.e("DEVK ","!!! mkdirs failed");
                return null;
            }
        }
        if (file_name == null) {
            file = new File(dir, generateFileNameBasedOnTimeStamp());
        } else {
            file = new File(dir, file_name);
        }
        file_path = file.getAbsolutePath();
        Log.d("... going to return an internal dir:" , file_path);
        if (file.exists()) {
            Log.d("... before creating to delete an external dir:" , file.getAbsolutePath());
            if (!file.delete()) {
                Log.e("DEVK","!!! failed to delete file");
                return null;
            }
        }
        return file;
    }

    @SuppressLint("LongLogTag")
    public File getExternalFile(String dir_name, String file_name, Context context) {
        String dir_path;
        String file_path;
        File file;
        if (!isExternalStorageWritable(context)) {
            Log.e("DEVK","!!! external storage not writable");
            return null;
        }
        if (dir_name == null) {
            dir_path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getAbsolutePath() + File.separator + DEFAULT_DIR_NAME;
        } else {
            dir_path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getAbsolutePath() + File.separator + dir_name;
        }
        if (file_name == null) {
            file_path = dir_path;
        } else {
            file_path = dir_path + File.separator + file_name;
        }
        Log.d("... going to return an external file:" , file_path);
        file = new File(file_path);
        if (file.exists()) {
            Log.d("... file exists:" , file.getAbsolutePath());
        } else {
            Log.e("!!! file does't exist:" , file.getAbsolutePath());
        }
        return file;
    }

    @SuppressLint("LongLogTag")
    public File getInternalFile(String dir_name, String file_name, Context context) {
        String file_path;
        File dir;
        File file;
        if (dir_name == null) {
            dir = new ContextWrapper(context).getDir(DEFAULT_DIR_NAME, Context.MODE_PRIVATE);
        } else {
            dir = new ContextWrapper(context).getDir(dir_name, Context.MODE_PRIVATE);
        }
        if (file_name == null) {
            file = new File(dir.getAbsolutePath());
        } else {
            file = new File(dir, file_name);
        }
        file_path = file.getAbsolutePath();
        Log.d("... going to return an internal dir:" , file_path);
        if (file.exists()) {
            Log.d("... file exists:" , file.getAbsolutePath());
        } else {
            Log.e("!!! file does't exist:" , file.getAbsolutePath());
        }
        return file;
    }

    private byte[] readBytesFromFile(File file) {
        Log.d(">>> path:" , file.getAbsolutePath());
        FileInputStream fis;
        long file_length;
        byte[] buffer;
        int offset = 0;
        int next = 0;
        if (!file.exists()) {
            Log.e("DEVK","!!! file doesn't exists");
            return null;
        }
        if (file.length() > Integer.MAX_VALUE) {
            Log.e("DEVK","!!! file length is out of max of int");
            return null;
        } else {
            file_length = file.length();
        }
        try {
            fis = new FileInputStream(file);
            //buffer = new byte[(int) file_length];
            buffer = new byte[(int) file.length()];
            long time_start = System.currentTimeMillis();
            while (true) {
                Log.d("... now next:" , next + " and offset:" + offset);
                if (System.currentTimeMillis() - time_start > 1000) {
                    Log.e("DEVK: ","!!! left due to time out");
                    break;
                }
                next = fis.read(buffer, offset, (buffer.length - offset));
                if (next < 0 || offset >= buffer.length) {
                    Log.d("DEVK","... completed to read");
                    break;
                }
                offset += next;
            }
            //if (offset < buffer.length) {
            if (offset < (int) file_length) {
                Log.e("DEVK","!!! not complete to read");
                return null;
            }
            fis.close();
            return buffer;
        } catch (IOException e) {
            e.printStackTrace();
            Log.e("DEVK ","!!! IOException");
            return null;
        }
    }

    public byte[] readBytesFromFile(File file, boolean is_fis_fos_only) {
        if (file == null) return null;
        if (is_fis_fos_only) {
            return readBytesFromFile(file);
        }
        Log.d(">>> path:" , file.getAbsolutePath());
        FileInputStream fis;
        BufferedInputStream bis;
        ByteArrayOutputStream bos;
        byte[] buf = new byte[(int) file.length()];
        int num_read;
        if (!file.exists()) {
            Log.e("DEVK,","!!! file doesn't exists");
            return null;
        }
        try {
            fis = new FileInputStream(file);
            bis = new BufferedInputStream(fis);
            bos = new ByteArrayOutputStream();
            long time_start = System.currentTimeMillis();
            while (true) {
                if (System.currentTimeMillis() - time_start > 1000) {
                    Log.e("DEVK","!!! left due to time out");
                    break;
                }
                num_read = bis.read(buf, 0, buf.length); //1024 bytes per call
                if (num_read < 0) break;
                bos.write(buf, 0, num_read);
            }
            buf = bos.toByteArray();
            fis.close();
            bis.close();
            bos.close();
            return buf;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            Log.e("DEVK","!!! FileNotFoundException");
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            Log.e("DEVK","!!! IOException");
            return null;
        }
    }

    /**
     * streams (InputStream and OutputStream) transfer binary data
     * if to write a string to a stream, must first convert it to bytes, or in other words encode it
     */
    public boolean writeStringToFile(File file, String string, Charset charset) {
        if (file == null) return false;
        if (string == null) return false;
        return writeBytesToFile(file, string.getBytes((charset == null) ? DEFAULT_CHARSET : charset));
    }

    public boolean writeBytesToFile(File file, byte[] data) {
        if (file == null) return false;
        if (data == null) return false;
        FileOutputStream fos;
        BufferedOutputStream bos;
        try {
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            bos.write(data, 0, data.length);
            bos.flush();
            bos.close();
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
//            Log.e("!!! IOException");
            return false;
        }
        return true;
    }

    /**
     * io blocks until some input/output is available.
     */
    @SuppressLint("LongLogTag")
    public boolean copy(File source, File destination) {
        if (source == null || destination == null) return false;
        Log.d(">>> source:" , source.getAbsolutePath() + ", destination:" + destination.getAbsolutePath());
        try {
            FileInputStream fis = new FileInputStream(source);
            FileOutputStream fos = new FileOutputStream(destination);
            byte[] buffer = new byte[(int) source.length()];
            int len;
            while (EOF != (len = fis.read(buffer))) {
                fos.write(buffer, 0, len);
            }
            if (true) { //debug
                byte[] copies = readBytesFromFile(destination);
                if (copies != null) {
                    int copy_len = copies.length;
                    Log.d("... stream read and write done for " , copy_len + " bytes");
                }
            }
            return destination.length() != 0;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    public void list(final String path, final String end, final List<File> files) {
        Log.d(">>> path:" , path + ", end:" + end);
        File file = new File(path);
        if (file.isDirectory()) {
            for (File child : file.listFiles()) {
                list(child.getAbsolutePath(), end, files);
            }
        } else if (file.isFile()) {
            if (end.equals("")) {
                files.add(file);
            } else {
                if (file.getName().endsWith(end)) files.add(file);
            }
        }
    }

    public String[] splitFileName(File file, String split) {
        String path;
        String ext;
        int lastIndexOfSplit = file.getAbsolutePath().lastIndexOf(split);
        if (lastIndexOfSplit < 0) {
            path = file.getAbsolutePath();
            ext = "";
        } else {
            path = file.getAbsolutePath().substring(0, lastIndexOfSplit);
            ext = file.getAbsolutePath().substring(lastIndexOfSplit);
        }
        return new String[]{path, ext};
    }

    @SuppressLint("LongLogTag")
    public File rename(File old_file, String new_name) {
        if (old_file == null || new_name == null) return null;
        Log.d(">>> old file path:" , old_file.getAbsolutePath() + ", new file name:" + new_name);
        File new_file = new File(old_file, new_name);
        if (!old_file.equals(new_file)) {
            if (new_file.exists()) { //if find out previous file/dir at new path name exists
                if (new_file.delete()) {
                    Log.d("... succeeded to delete previous file at new abstract path name:" , new_file.getAbsolutePath());
                } else {
                    Log.e("DEVK","!!! failed to delete previous file at new abstract path name");
                    return null;
                }
            }
            if (old_file.renameTo(new_file)) {
                Log.d("... succeeded to rename old file to new abstract path name:" , new_file.getAbsolutePath());
            } else {
                Log.e("DEVK","!!! failed to rename old file to new abstract path name");
            }
        } else {
            Log.d("... new and old file have the equal abstract path name:" , new_file.getAbsolutePath());
        }
        return new_file;
    }

    public boolean remove(final String path, final String end) {
        Log.d(">>> path:" , path + ", end:" + end);
        File file = new File(path);
        boolean result = false;
        if (file.isDirectory()) {
            for (File child : file.listFiles()) {
                result = remove(child.getAbsolutePath(), end);
            }
        } else if (file.isFile()) {
            if (end.equals("")) {
                result = file.delete();
            } else {
                if (file.getName().endsWith(end)) result = file.delete();
            }
        } else {
            Log.e("DEVK:","!!! child is not file or directory");
        }
        return result;
    }

    @TargetApi(Build.VERSION_CODES.O)
    public byte[] readNIOBytesFromFile(String path) throws IOException {
        Log.d(">>> path:" , path);
        if (!Files.exists(Paths.get(path), LinkOption.NOFOLLOW_LINKS)) {
            Log.e("DEVK","!!! file doesn't exists");
            return null;
        } else {
            return Files.readAllBytes(Paths.get(path));
        }
    }

    @TargetApi(Build.VERSION_CODES.O)
    public File writeNIOBytesToFile(String dir, String name, byte[] data) {
        Log.d(">>> dir:" , dir + ", name:" + name);
        Path path_dir;
        Path path_file;
        try {
            if (!Files.exists(Paths.get(dir), LinkOption.NOFOLLOW_LINKS)) {
//                Log.d("... make a dir");
                path_dir = Files.createDirectories(Paths.get(dir));
                if (path_dir == null) {
                    Log.e("DEVK,","!!! failed to make a dir");
                    return null;
                }
            }
            path_file = Files.write(Paths.get(name), data);
            return path_file.toFile();
        } catch (IOException e) {
            e.printStackTrace();
//            Log.e("!!! IOException");
            return null;
        }
    }

    @TargetApi(Build.VERSION_CODES.O)
    public void listNIO(final String dir, final String end, final List<File> files) throws IOException {
        Log.d(">>> dir:" , dir + ", end:" + end);
        Files.walkFileTree(Paths.get(dir), new FileVisitor<Path>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
                Log.d("... file:" , dir.getFileName().toString());
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                Log.d("... file:" , file.getFileName().toString());
                if (end.equals("")) {
                    files.add(file.toFile());
                } else {
                    if (file.endsWith(end)) files.add(file.toFile());
                }
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult visitFileFailed(Path file, IOException exc) {
                Log.d("... file:" , file.getFileName().toString());
                if (end.equals("")) {
                    files.add(file.toFile());
                } else {
                    if (file.endsWith(end)) files.add(file.toFile());
                }
                return FileVisitResult.CONTINUE;
            }

            @Override
            public FileVisitResult postVisitDirectory(Path dir, IOException exc) {
                Log.d("... file:" , dir.getFileName().toString());
                return FileVisitResult.CONTINUE;
            }
        });
    }

    /**
     * recursion
     */
    private int factorial(int x) {
        if (x > 1) return (x * (factorial(x - 1)));
        else if (x == 1) return x;
        else return 0;
    }
}