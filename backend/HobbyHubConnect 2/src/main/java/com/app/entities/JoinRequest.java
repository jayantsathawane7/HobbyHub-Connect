package com.app.entities;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public  class JoinRequest {
    private int groupId;
    private int userId;
}