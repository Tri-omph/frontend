import React, { ReactNode } from "react";
import { FontAwesome } from "@expo/vector-icons";

export interface FormRuleType {
  name: string;
  icon: ReactNode;
  label?: string;
  placeholder: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | undefined;
  secureTextEntry?: boolean;
  rules: {
    required: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    validate?: { [key: string]: (value: string) => boolean | string };
  };
}

export const signUpFormAndRules: FormRuleType[] = [
  {
    name: "username",
    icon: <FontAwesome name="user" size={20} color="#888" />,
    label: "Nom d'utilisateur",
    placeholder: "Votre nom d'utilisateur",
    rules: {
      required: "Le nom d'utilisateur est requis.",
      pattern: {
        value: /^[a-zA-Z][a-zA-Z0-9_-]{2,29}$/,
        message:
          "Le nom d'utilisateur doit commencer par une lettre et contenir entre 3 et 30 caractères (lettres, chiffres, _ ou -).",
      },
    },
  },
  {
    name: "email",
    icon: <FontAwesome name="envelope" size={15} color="#888" />,
    label: "Adresse mail",
    placeholder: "Votre email",
    keyboardType: "email-address",
    rules: {
      required: "L'adresse email est requise.",
      pattern: {
        value:
          /^(?!\.\.)([a-zA-Z\d][a-zA-Z_%\-.\d+]{0,63})@([a-zA-Z\d]+(-[a-zA-Z\d]+)*\.)+[a-zA-Z]{2,6}$/,
        message: "Veuillez entrer une adresse email valide.",
      },
    },
  },
  {
    name: "password",
    label: "Mot de passe",
    icon: <FontAwesome name="lock" size={20} color="#888" />,
    placeholder: "Mot de passe",
    secureTextEntry: true,
    rules: {
      required: "Le mot de passe est requis.",
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]\\:";'<>?,./]).{8,}$/,
        message:
          "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et être d'au moins 8 caractères.",
      },
    },
  },
  {
    name: "confirmPassword",
    label: "Confirmer le mot de passe",
    icon: <FontAwesome name="lock" size={20} color="#888" />,
    placeholder: "Confirmer le mot de passe",
    secureTextEntry: true,
    rules: {
      required: "Veuillez confirmer votre mot de passe.",
    },
  },
];

export const signInFormAndRules: FormRuleType[] = [
  {
    name: "login",
    icon: <FontAwesome name="user" size={20} color="#888" />,
    placeholder: "Votre nom d'utilisateur ou email",
    rules: {
      required: "Le login est requis.",
    },
  },
  {
    name: "password",
    icon: <FontAwesome name="lock" size={20} color="#888" />,
    placeholder: "Votre mot de passe",
    secureTextEntry: true,
    rules: {
      required: "Le mot de passe est requis.",
    },
  },
];
