import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "Dungeon World",
  clientId: "dungeon_client",
});

export default keycloak;
