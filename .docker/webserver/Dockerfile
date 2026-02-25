FROM nginx:1.28-alpine

RUN apk add --no-cache \
    bash \
    curl \
    openssl \
    ca-certificates \
    vim

RUN addgroup -g 1001 appuser && \
    adduser -D -u 1001 -G appuser appuser && \
    mkdir -p /home/appuser && \
    chown -R appuser:appuser /home/appuser
    
EXPOSE 80