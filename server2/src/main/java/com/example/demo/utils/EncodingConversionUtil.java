package com.example.demo.utils;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class EncodingConversionUtil {
    public static String encodeBase64(String originalString) {
        byte[] bytes = originalString.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }
    public static String decodeBase64(String base64String) {
        byte[] bytes = Base64.getDecoder().decode(base64String);
        return new String(bytes);
    }
}
