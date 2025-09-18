FROM maven:3.9.11-eclipse-temurin-17 as builder

WORKDIR /app-builder

COPY . .

RUN mvn clean package

FROM eclipse-temurin:17.0.16_8-jre-noble

RUN apt-get install bash

WORKDIR /app

ENV PORT=8080

COPY --from=builder /app-builder/target/agendamento-0.0.1-SNAPSHOT.jar /app

CMD ["java", "-jar", "./agendamento-0.0.1-SNAPSHOT.jar"]