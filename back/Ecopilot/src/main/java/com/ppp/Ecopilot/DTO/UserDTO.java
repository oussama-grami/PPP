package com.ppp.Ecopilot.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@NoArgsConstructor
public abstract class UserDTO {
    @Email()
    protected String email;
    @NotEmpty()
    protected String nom;
    protected String password;
}
