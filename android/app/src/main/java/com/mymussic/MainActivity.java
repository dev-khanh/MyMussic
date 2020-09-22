package com.mymussic;

import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FirebaseStorage;
//import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.File;

public class MainActivity extends ReactActivity {
//  private StorageReference mStorageRef;
  @Override
  protected String getMainComponentName() {
    return "MyMussic";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
//    mStorageRef = FirebaseStorage.getInstance().getReference();
//    upLoadFile();
  }
//  private void upLoadFile(){
//    File files = new File("/data/data/com.mymussic/Data/text.txt");
//    if(!files.exists()){
//      Log.e("DEVK", "Khong");
//      return;
//    }
//    Uri file = Uri.fromFile(files);
//    StorageReference riversRef = mStorageRef.child("database/text.txt");
//    riversRef.putFile(file).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
//        @Override
//        public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
//          // Get a URL to the uploaded content
//          Log.d("DEVK", "UPLOAD Sucess !!!");
//        }
//      })
//      .addOnFailureListener(new OnFailureListener() {
//        @Override
//        public void onFailure(@NonNull Exception exception) {
//          // Handle unsuccessful uploads
//          Log.e("DEVK", "UPLOAD unsuccessful !!!");
//          // ...
//        }
//      });
//  }
}
