# session-02-containers


enable pgadmin using docker-compose
```
  pgadmin:
    container_name: pgadmin4
    image: dpage/pgadmin4
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: root
    ports:
      - "5050:80"
```