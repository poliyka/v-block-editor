FROM node:16.3-buster-slim

RUN useradd --create-home appuser
USER appuser
WORKDIR /home/appuser/app

COPY --chown=appuser docker/entrypoint.sh /home/appuser/app/
