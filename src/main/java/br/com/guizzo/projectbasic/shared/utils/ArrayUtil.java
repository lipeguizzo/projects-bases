package br.com.guizzo.projectbasic.shared.utils;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ArrayUtil {
    public static <T> T getFirstItem(List<T> list) {
        return list != null && !list.isEmpty() ? list.get(0) : null;
    }
}
