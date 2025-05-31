FROM maven:3.9.8-amazoncorretto-21 AS build

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src /build/src
COPY ../uploads /build/uploads
RUN mvn clean package -DskipTests

FROM amazoncorretto:21 as runtime

WORKDIR /app

COPY --from=build /build/target/Ecopilot-1.0.0.jar /app/target/ecopilot.jar

WORKDIR /app/target

EXPOSE 8087

CMD ["java", "-jar", "ecopilot.jar"]