package br.com.guizzo.projectbasic.shared.utils;

import br.com.guizzo.projectbasic.infra.filesystem.enums.Folder;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Component
public class FileUtil {

    public static String generateFileName(String fileName) {
        TimeZone timeZone = TimeZone.getTimeZone("GMT-3");
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy-HH-mm-ss");
        dateFormat.setTimeZone(timeZone);

        String formattedDate = dateFormat.format(new Date());

        String name = getFileName(fileName);
        String extension = getFileExtension(fileName);

        return String.format("%s-%s%s", name, formattedDate, extension);
    }

    public static String getFileExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex == -1 || lastDotIndex == fileName.length() - 1) {
            return "";
        }
        return fileName.substring(lastDotIndex);
    }

    public static String getFileName(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex == -1) {
            return fileName;
        }
        return fileName.substring(0, lastDotIndex);
    }

    public static String getRelativePath(Folder folder, Long id) {
       return String.format("%s/%s", folder, id);
    }
}
