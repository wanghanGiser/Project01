package com.wanghan.controller.dto;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

public class LoginRegStatus {
    private boolean status;
    private String logInfo;

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getLogInfo() {
        return logInfo;
    }

    public void setLogInfo(String logInfo) {
        this.logInfo = logInfo;
    }

    public LoginRegStatus() {
    }

    public LoginRegStatus(boolean status, String logInfo) {
        this.status = status;
        this.logInfo = logInfo;
    }
}
