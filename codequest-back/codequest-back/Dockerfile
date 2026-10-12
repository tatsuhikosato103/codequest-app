# 1. ビルド環境
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN sed -i 's/\r$//' gradlew
RUN chmod +x gradlew
RUN ./gradlew build -x test

# 2. 実行環境
FROM eclipse-temurin:21-jre
WORKDIR /app
# Gradleで生成されたJARファイルをコピー
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]