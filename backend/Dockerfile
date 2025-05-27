FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

RUN apt-get update && \
    apt-get install -y gcc libpq-dev python3-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get clean

COPY . /app/backend/

COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]