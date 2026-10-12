# 1. ビルド環境
FROM maven:3.8.5-openjdk-21 AS build
WORKDIR /app
COPY src .
RUN mvn clean package -DskipTests
FROM openjdk:21-jdk-slim
WORKDIR /app
# ビルドしたJARファイルをコピー
COPY --from=build /app/target/*.jar app.jar
# ポート8080を開放
EXPOSE 8080
# アプリケーションの起動
ENTRYPOINT ["java", "-jar", "app.jar"]