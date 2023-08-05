FROM denoland/deno:latest

# Instala denon
RUN deno install -qAf --unstable https://deno.land/x/denon/denon.ts

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo deps.ts (se existir)
COPY deps.ts .

RUN deno cache deps.ts
