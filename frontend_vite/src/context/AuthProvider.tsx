
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { useEffect, useRef, useState } from "react";
import keycloak from "~/lib/keycloak";

export default function AuthProvider({ children }: { children: React.ReactNode }) {



    return <ReactKeycloakProvider authClient={(keycloak)}>{children}</ReactKeycloakProvider>;
}
