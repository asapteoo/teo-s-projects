import cv2

# I am going to use haar cascades to help me out figure the smile detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
smile_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_smile.xml')

# This will open the camera
cap = cv2.VideoCapture(0)

while True:
    # This will capture each frame from the webcam
    ret, frame = cap.read()
    '''
    ret is a boolean variable that returns true if the frame is available
    while "Frame" will get the next frame in the camera (via "cap")
    '''
    # Convert the frame to grayscale.
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    '''
    The next lines are important to detect the faces
    minNeighbors helps the program to not detect other objects
    '''
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
    
    # Iterate over each detected face
    for (x, y, w, h) in faces:
        # Draw a rectangle around the face
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
        
        # Get the region of interest (ROI) for the face
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]
        
        # Detect smiles within the face ROI
        smiles = smile_cascade.detectMultiScale(roi_gray, scaleFactor=1.8, minNeighbors=20)
        
        # If a smile is detected, print an emoji
        if len(smiles) > 0:
            print("😊")  # Smile emoji
        
        # Iterate over each detected smile
        for (sx, sy, sw, sh) in smiles:
            # Draw a rectangle around the smile
            cv2.rectangle(roi_color, (sx, sy), (sx+sw, sy+sh), (0, 255, 255), 2)

    
    # Display the resulting frame
    cv2.imshow('Smile Detector', frame)
    
    # Break the loop if the user presses 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and close the windows
cap.release()
cv2.destroyAllWindows()