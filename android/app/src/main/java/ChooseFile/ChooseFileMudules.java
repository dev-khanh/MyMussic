package ChooseFile;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mymussic.MainActivity;
import java.io.File;

import static android.app.Activity.RESULT_OK;

public class ChooseFileMudules extends ReactContextBaseJavaModule {
    private static final int READ_REQUEST_CODE = 41;
    public ChooseFileMudules(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return "ChooseFileMudules";
    }
    @ReactMethod
    public void File(String uri, Callback callback) {
        try {
            Uri uria = Uri.parse(uri);
            File file = FileUtil.from(getReactApplicationContext(), uria);
            Log.d("DEVK", "File...:::: uti - "+file .getPath()+" file -" + file + " : " + file .exists());
            callback.invoke(file.toString());
        } catch (Throwable e) {
            Log.e("DEVK: ", e.toString());
        }
    }
//    private final ActivityEventListener activityEventListener = new BaseActivityEventListener() {
//        @Override
//        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
//            if (requestCode == READ_REQUEST_CODE) {
//                if (resultCode == RESULT_OK) {
//                    Uri uri = data.getData();
//                    try {
//
//                        upLoadFile(file);
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                }
//            }
//        }
//    };
}
