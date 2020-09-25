package com.mymussic;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.common.file.FileUtils;
import com.facebook.react.ReactActivity;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.File;
import java.net.URISyntaxException;

public class MainActivity extends ReactActivity {
  private StorageReference mStorageRef;
  private static final int READ_REQUEST_CODE = 41;

  @Override
  protected String getMainComponentName() {
    return "MyMussic";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mStorageRef = FirebaseStorage.getInstance().getReference();
//    upLoadFile();
  }
  private void upLoadFile(File files){
//    File files = new File("/data/data/com.mymussic/Data/text.txt");
    if(!files.exists()){
      Log.e("DEVK", "Khong");
      return;
    }
    Uri file = Uri.fromFile(files);
    StorageReference riversRef = mStorageRef.child("database/demo");
    riversRef.putFile(file).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
        @Override
        public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
          // Get a URL to the uploaded content
          Log.d("DEVK", "UPLOAD Sucess !!!");
        }
      })
      .addOnFailureListener(new OnFailureListener() {
        @Override
        public void onFailure(@NonNull Exception exception) {
          // Handle unsuccessful uploads
          Log.e("DEVK", "UPLOAD unsuccessful !!!");
          // ...
        }
      });
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == READ_REQUEST_CODE) {
//      if (promise != null) {
//        onShowActivityResult(resultCode, data, promise);
//        promise = null;
//      }
      if (resultCode == RESULT_OK) {
        // Get the Uri of the selected file
        Uri uri = data.getData();
        Log.d("DEVK", "File Uri: " + uri.toString());
        File file = new File(uri.getPath());
        Log.d("DEVK", "File getPath: " + file.toString());
        upLoadFile(file);

//        try {
//          File file = FileUtil.from(MainActivity.this,fileUri);
//          Log.d("file", "File...:::: uti - "+file .getPath()+" file -" + file + " : " + file .exists());
//
//        } catch (IOException e) {
//          e.printStackTrace();
//        }
      }
    }
    super.onActivityResult(requestCode, resultCode, data);
  }
}
