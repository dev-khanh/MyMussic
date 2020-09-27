package com.mymussic;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
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
//  private void upLoadFile(File files){
//    File files = new File("/data/data/com.mymussic/Data/text.txt");
//    if(!files.exists()){
//      Log.e("DEVK", "Khong");
//      return;
//    }
//    Uri file = Uri.fromFile(files);
//    StorageReference riversRef = mStorageRef.child("database/demo");
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