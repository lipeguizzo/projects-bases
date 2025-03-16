package br.com.guizzo.projectbasic.shared.utils;

import br.com.guizzo.projectbasic.shared.exceptions.BadRequestException;

import java.security.MessageDigest;

public class HashUtil {

    public static String hashMd5(byte[] data)  {

        try {

            MessageDigest md5Digest = MessageDigest.getInstance("MD5");

            md5Digest.update(data);

            byte[] digestBytes = md5Digest.digest();
            StringBuilder sb = new StringBuilder();

            for (byte b : digestBytes) {
                sb.append(String.format("%02x", b));
            }

            return sb.toString();

        }catch (Exception e){
            throw new BadRequestException(e.getMessage());
        }
    }
}
