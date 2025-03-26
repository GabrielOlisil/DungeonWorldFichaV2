"use client";

import { ReactNode, useEffect, useState } from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "@/lib/keycloak";

export default function AuthProvider({ children }: { children: ReactNode }) {

    return <ReactKeycloakProvider authClient={keycloak}>{children}</ReactKeycloakProvider>;
}