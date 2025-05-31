# Stage 1: Builder stage
FROM python:3.10-slim-bullseye AS builder

# Installer les dépendances minimales nécessaires pour la compilation
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les requirements pour profiter du cache Docker
COPY requirements.txt .

# Installer les dépendances dans un environnement virtuel
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Installer les dépendances en mode production et sans cache
RUN pip install --no-cache-dir --compile -r requirements.txt

# Stage 2: Final stage
FROM python:3.10-slim-bullseye

# Copier l'environnement virtuel du builder
COPY --from=builder /opt/venv /opt/venv

# Définir le PATH pour utiliser l'environnement virtuel
ENV PATH="/opt/venv/bin:$PATH"

# Créer un utilisateur non-root
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Définir le dossier de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires
COPY app.py .
COPY ensemble_event_emission_model.pkl .
COPY carbon_footprint_dataset.csv .

# Définir les variables d'environnement
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

# Donner les permissions à l'utilisateur non-root
RUN chown -R appuser:appuser /app

# Passer à l'utilisateur non-root
USER appuser

# Commande de démarrage
CMD ["python", "-u", "app.py"]
