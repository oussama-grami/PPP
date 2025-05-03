FROM quay.io/keycloak/keycloak:25.0.0

# Set environment variables for Keycloak
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Database configuration - will be overridden by environment variables on Render.com
ENV KC_DB=mysql
ENV KC_DB_URL=jdbc:mysql://mysql-13412e03-oussamagrami03-7663.l.aivencloud.com:14638/defaultdb
ENV KC_DB_USERNAME=avnadmin
ENV KC_DB_PASSWORD=AVNS_mfIu_ISiAwzEGvXx7nC

# Network configuration for Render.com
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_HTTP_ENABLED=true
ENV KC_PROXY=edge
ENV KC_HEALTH_ENABLED=true

# Copy the custom theme JAR into the Keycloak providers directory
COPY build_keycloak/keycloak-theme-for-kc-22-and-above.jar /opt/keycloak/providers/

# Set the working directory
WORKDIR /opt/keycloak

# Build the Keycloak distribution to include the custom theme
RUN /opt/keycloak/bin/kc.sh build

# Expose the default Keycloak port
EXPOSE 8080

# Start Keycloak with proper configuration to bind to all interfaces
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--http-enabled=true", "--hostname-strict=false", "--hostname=0.0.0.0"]