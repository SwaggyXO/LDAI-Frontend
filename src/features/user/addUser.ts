import { useEffect } from 'react';
import { useCreateUserMutation, useGetUserInfoQuery } from '../../api/userApiSlice';
import { v4 as uuidv4 } from 'uuid';

const addUser = async (ciamId: string) => {
  const { data: userInfoData } = useGetUserInfoQuery();
  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    const addUser = async () => {
      // Ensure userInfoData is fetched before proceeding
      if (!userInfoData) {
        return;
      }

      // Check if user already exists
      const existingUser = userInfoData.find((user) => user["ciam-id"] === ciamId);

      if (!existingUser) {
        const newUser = {
          "id": uuidv4(),
          "ciam-id": ciamId,
          "grade": null,
          "marbles": 0,
          "xp": 0,
          "isNew": true,
          "timezone": null,
          "streak": 1
        };

        try {
          // Use await to ensure the updateUserInfo mutation is completed before logging
          const response = await createUser(newUser);
          console.log('User added successfully:', response);
        } catch (error) {
          console.error('Error adding user:', error);
        }
      }
    };

    addUser();
  }, [ciamId, userInfoData, createUser]);

  return null;
};

export default addUser;
