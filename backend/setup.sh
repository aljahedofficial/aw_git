#!/bin/bash
# Setup and run the linguistic analysis backend

echo "🚀 Setting up Linguistic Analysis Backend"
echo "=========================================="

# Check Python version
echo "Checking Python installation..."
python3 --version

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Download spaCy model
echo "Downloading spaCy language model..."
python3 -m spacy download en_core_web_sm

# Download NLTK data
echo "Downloading NLTK data..."
python3 -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"

echo ""
echo "✅ Setup complete!"
echo "To start the backend server, run:"
echo "  source venv/bin/activate"
echo "  python app.py"
echo ""
echo "The API will be available at: http://localhost:5000"
