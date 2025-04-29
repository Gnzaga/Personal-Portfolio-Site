curl -X POST http://192.168.42.27:3000/api/chat/completions \
-H "Authorization: Bearer sk-25a79c4f999a4e8f81023e791fb35c5e" \
-H "Content-Type: application/json" \
-d '{
      "model": "gnzaga",
      "messages": [
        {
          "role": "user",
          "content": "Where does Alessandro Work?"
        }
      ]
    }'
