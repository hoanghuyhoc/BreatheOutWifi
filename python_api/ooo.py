with open("emotion.txt", "r") as file:
    emotion = ""
    line = file.readlines()
    if not line:
        emotion = "none"
    else:
        emotion = line[-1].strip()
    print(emotion)