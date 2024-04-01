import { useGetUserInfoQuery, useGetUserAchievementsQuery, useGetUserStatsQuery } from '../api/userApiSlice'

type DataType = 'info' | 'achievements' | 'stats';

const useUserData = (dataType: DataType) => {
    const { data: userInfoData, error: userInfoError, isLoading: userInfoLoading } = useGetUserInfoQuery();
    const { data: achievementsData, error: achievementsError, isLoading: achievementsLoading } = useGetUserAchievementsQuery();
    const { data: statsData, error: statsError, isLoading: statsLoading } = useGetUserStatsQuery();

    let data: any = null;
    let loading: boolean = false;
    let error: string | null = null;

    if (dataType === 'info') {
        data = userInfoData;
        loading = userInfoLoading;
        error = userInfoError ? (userInfoError as Error).message : null;  
    } else if (dataType === 'achievements') {
        data = achievementsData;
        loading = achievementsLoading;
        error = achievementsError ? (achievementsError as Error).message : null;  
    } else if (dataType === 'stats') {
        data = statsData;
        loading = statsLoading;
        error = statsError ? (statsError as Error).message : null;  
    }

    return { data, loading, error };
};

export default useUserData;
