FROM ubuntu:20.04

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Download the 1.5B DeepSeek model
RUN ollama download deepseek-1.5B

# Expose the port Ollama will run on
EXPOSE 8080

# Start Ollama
CMD ["ollama", "serve"]