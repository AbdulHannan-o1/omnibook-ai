# Use an official Python runtime as a parent image
FROM python:3.11-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy only the backend directory into the container
COPY backend/ /app/backend/

# Install any needed packages specified in requirements.txt
# Ensure requirements.txt is in the backend directory
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Expose the port the app runs on
EXPOSE $PORT

# Run the uvicorn server
CMD uvicorn backend.main:app --host 0.0.0.0 --port $PORT
