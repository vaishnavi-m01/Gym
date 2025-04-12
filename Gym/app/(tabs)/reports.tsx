import React, { useState } from 'react';
import { Button, View, Alert, Image, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handlePickImage = async () => {
    try {
      // Step 1: Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow access to your photos');
        return;
      }

      // Step 2: Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
      });

      if (result.canceled) return;

      const image = result.assets[0];
      const { uri } = image;

      setPreviewUri(uri); // Show preview

      // Step 3: Create file object
      const fileName = uri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : 'image/jpeg';

      const file = {
        uri,
        name: fileName,
        type: fileType,
      };

      const formData = new FormData();
      formData.append('file', file as any);

      // Debug log
      console.log('📤 Uploading file:', JSON.stringify(file, null, 2));

      // Step 4: Upload to server (fake upload)
      const uploadResponse = await axios.post(
        'https://jsonplaceholder.typicode.com/posts', // Replace with your real image server
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Step 5: Simulated image URL
      const imageUrl = `https://192.168.1.2/image/${fileName}.${fileType}`;
      setUploadedImageUrl(imageUrl);

      console.log('✅ Image uploaded:', imageUrl);

      // Step 6: Send profile update request
      const profileUpdate = {
        profile_picture: imageUrl,
      };

      const finalResponse = await axios.post(
        'https://jsonplaceholder.typicode.com/posts', // Replace with real API
        profileUpdate,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Final API request:', profileUpdate);
      console.log('🟢 Server Response:', finalResponse.data);

      // Step 7: Show success alert
      Alert.alert('Success', 'Profile picture updated!');
    } catch (err: any) {
      console.error('❌ Error:', err.message);
      Alert.alert('Upload Failed', err.message);
    }
  };

  return (
    <View style={{ marginTop: 100, paddingHorizontal: 20 }}>
      <Button title="Choose & Upload Image" onPress={handlePickImage} />

      {previewUri && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Image
            source={{ uri: previewUri }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
          <Text style={{ marginTop: 10 }}>📷 Selected Image Preview</Text>
        </View>
      )}

      {uploadedImageUrl && (
        <Text style={{ marginTop: 20, color: 'green' }}>
          ✅ Uploaded URL: {uploadedImageUrl}
        </Text>
      )}
    </View>
  );
}
