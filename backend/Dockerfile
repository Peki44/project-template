# Stage 1: Build the Next.js SPA frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /frontend

# Copy frontend dependency manifests and install
COPY frontend/package*.json ./
RUN npm ci || npm install

# Copy frontend source and build static export (outputs to /frontend/dist)
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Go PocketBase binary
FROM golang:1.27-alpine AS go-builder
WORKDIR /backend

# Copy backend module files and download dependencies
COPY backend/go.mod backend/go.sum* ./
RUN go mod download

# Copy backend source code and build pure Go binary without CGO
COPY backend/ ./
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /pocketbase .

# Stage 3: Minimal production runtime
FROM alpine:3.21 AS runtime

RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

# Copy binary from go-builder and static SPA files from frontend-builder
COPY --from=go-builder /pocketbase /app/pocketbase
COPY --from=frontend-builder /frontend/dist /app/pb_public

EXPOSE 8090
VOLUME /pb_data

CMD ["/app/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--publicDir=/app/pb_public"]
