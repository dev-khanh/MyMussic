package ChooseFile;

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

public class UriHelper {
    private static UriHelper INSTANCE = new UriHelper();

    public static UriHelper getInstance() {
        return INSTANCE;
    }

    @SuppressLint("SimpleDateFormat")
    public String generateFileNameBasedOnTimeStamp() {
        return new SimpleDateFormat("yyyyMMdd_hhmmss").format(new Date()) + ".jpeg";
    }

    /**
     * if uri.getScheme.equals("content"), open it with a content resolver.
     * if the uri.Scheme.equals("file"), open it using normal file methods.
     */
//
    public File toFile(Uri uri) {
        if (uri == null) return null;
        Log.d(">>> uri path:" , uri.getPath());
        Log.d(">>> uri string:" , uri.toString());
        return new File(uri.getPath());
    }

    public DocumentFile toDocumentFile(Uri uri) {
        if (uri == null) return null;
        Log.d(">>> uri path:" , uri.getPath());
        Log.d(">>> uri string:" , uri.toString());
        return DocumentFile.fromFile(new File(uri.getPath()));
    }

    public Uri toUri(File file) {
        if (file == null) return null;
        Log.d(">>> file path:" , file.getAbsolutePath());
        return Uri.fromFile(file); //returns an immutable URI reference representing the file
    }

    @SuppressLint("LongLogTag")
    public String getPath(Uri uri, Context context) {
        if (uri == null) return null;
        if (uri.getScheme() == null) return null;
        Log.d(">>> uri path:" , uri.getPath());
        Log.d(">>> uri string:" , uri.toString());
        String path;
        if (uri.getScheme().equals("content")) {
            //Cursor cursor = context.getContentResolver().query(uri, new String[] {MediaStore.Images.ImageColumns.DATA}, null, null, null);
            Cursor cursor = context.getContentResolver().query(uri, null, null, null, null);
            if (cursor == null) {
                Log.e("DEVK","!!! cursor is null");
                return null;
            }
            if (cursor.getCount() >= 0) {
                Log.d("... the numbers of rows:" , cursor.getCount()
                        + "and the numbers of columns:" + cursor.getColumnCount());
                if (cursor.isBeforeFirst()) {
                    while (cursor.moveToNext()) {
                        StringBuilder stringBuilder = new StringBuilder();
                        for (int i = 0; i < cursor.getColumnCount(); i++) {
                            stringBuilder.append("... iterating cursor.getString(" + i + "(" + cursor.getColumnName(i) + ")):" + cursor.getString(i));
                            stringBuilder.append("\n");
                        }
                        Log.d("DEVK: ",stringBuilder.toString());
                    }
                } else {
                    cursor.moveToFirst();
                    do {
                        StringBuilder stringBuilder = new StringBuilder();
                        for (int i = 0; i < cursor.getColumnCount(); i++) {
                            stringBuilder.append("... iterating cursor.getString(" + i + "(" + cursor.getColumnName(i) + ")):" + cursor.getString(i));
                            stringBuilder.append("\n");
                        }
                        Log.d("DEVK: ",stringBuilder.toString());
                    } while (cursor.moveToNext());
                }
                path = uri.getPath();
                cursor.close();
                Log.d("... content scheme:" , uri.getScheme() + "  and return:" + path);
                return path;
            } else {
                path = uri.getPath();
                Log.d("... content scheme:" , uri.getScheme()
                        + " but the numbers of rows in the cursor is < 0:" + cursor.getCount()
                        + "  and return:" + path);
                return path;
            }
        } else {
            path = uri.getPath();
            Log.d("... not content scheme:" , uri.getScheme() + "  and return:" + path);
            return path;
        }
    }

    @SuppressLint("LongLogTag")
    public String getFileName(Uri uri, Context context) {
        if (uri == null) return null;
        if (uri.getScheme() == null) return null;
        Log.d(">>> uri path:" , uri.getPath());
        Log.d(">>> uri string:" , uri.toString());
        String path;
        if (uri.getScheme().equals("content")) {
            //Cursor cursor = context.getContentResolver().query(uri, new String[] {MediaStore.Images.ImageColumns.DATA}, null, null, null);
            Cursor cursor = context.getContentResolver().query(uri, null, null, null, null);
            if (cursor == null) {
                Log.e("DEVK","!!! cursor is null");
                return null;
            }
            if (cursor.getCount() >= 0) {
                Log.d("... the numbers of rows:" , cursor.getCount()
                        + "and the numbers of columns:" + cursor.getColumnCount());
                if (cursor.isBeforeFirst()) {
                    while (cursor.moveToNext()) {
                        StringBuilder stringBuilder = new StringBuilder();
                        for (int i = 0; i < cursor.getColumnCount(); i++) {
                            stringBuilder.append("... iterating cursor.getString(" + i + "(" + cursor.getColumnName(i) + ")):" + cursor.getString(i));
                            stringBuilder.append("\n");
                        }
                        Log.d("DEVK: ",stringBuilder.toString());
                    }
                } else {
                    cursor.moveToFirst();
                    do {
                        StringBuilder stringBuilder = new StringBuilder();
                        for (int i = 0; i < cursor.getColumnCount(); i++) {
                            stringBuilder.append("... iterating cursor.getString(" + i + "(" + cursor.getColumnName(i) + ")):" + cursor.getString(i));
                            stringBuilder.append("\n");
                        }
                        Log.d("DEVK: ",stringBuilder.toString());
                    } while (cursor.moveToNext());
                }
                cursor.moveToFirst();
                path = cursor.getString(cursor.getColumnIndex(MediaStore.Images.ImageColumns.DISPLAY_NAME));
                cursor.close();
                Log.d("... content scheme:" , uri.getScheme() + "  and return:" + path);
                return path;
            } else {
                path = uri.getLastPathSegment();
                Log.d("... content scheme:" , uri.getScheme()
                        + " but the numbers of rows in the cursor is < 0:" + cursor.getCount()
                        + "  and return:" + path);
                return path;
            }
        } else {
            path = uri.getLastPathSegment();
            Log.d("... not content scheme:" , uri.getScheme() + "  and return:" + path);
            return path;
        }
    }
}
