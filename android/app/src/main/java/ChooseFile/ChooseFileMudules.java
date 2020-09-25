package ChooseFile;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.net.URI;

public class ChooseFileMudules extends ReactContextBaseJavaModule {
    public ChooseFileMudules(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    @NonNull
    @Override
    public String getName() {
        return "ChooseFileMudules";
    }
    @ReactMethod
    public void File(String uri) {
        try {
            File file = new File(uri);
            Log.e("DEVK", file.toString());
        } catch (Throwable e) {
        }
    }
}
