import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useSession } from "../../hooks/useSession";
import { useContext, useEffect, useState } from "react";
import { TitleScreen } from "../../components/titleScreen/TitleScreen";
import { SubtitleScreen } from "../../components/subtitleScreen/SubtitleScreen";
import { Avatar, ListItem } from "@rneui/base";
import { BACKEND_URL } from "../../constants/backend_url";
import { router } from "expo-router";
import Api from "../../services/api";
import AuthContext from "../../context/authContext";
import { useStorageState } from "../../hooks/useStorageState";

interface Threat {
    id: string,
    category_id: string,
    title: string,
    threat_level: number,
    description: string,
    municipality_id: string,
    image_id: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    image: {
        fileName: string,
        contentLength: number,
        contentType: string,
        url: string
    },
    category: {
        title: string
    }
}

export default function HomeScreen() {

    const [[isLoading, session]] = useStorageState('session')
    const auth = useContext(AuthContext)

    const [data, setData] = useState<Array<Threat>>([])
    const [page, setPage] = useState(1) //Página atual
    const [pageSize, setPageSize] = useState(10); //Quantidade por página
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // useEffect(() => {
    //     const params = {
    //         skip: (page - 1) * pageSize,
    //         take: pageSize,
    //         order: 'asc',
    //         muncipality_id: auth.session?.municipality_id
    //     }

    //     Api.get('/threat/mobile', { params })
    //         .then((response) => {
    //             console.warn(response)
    //             setData(response.data)
    //             // setTotalItems(response.data.legth)
    //         }).catch((error) => {
    //             console.warn(error)
    //         })
    // }, [page, pageSize])

    useEffect(() => {
        fetchData()
    }, [])

    const _replaceUrlImage = (url: string) => {
        const parts = url.split('http://localhost:3001')
        return parts.join(BACKEND_URL)
    }

    const _nextPage = (threat: Threat) => {
        router.push({ pathname: '/(app)/description', params: { title: threat.title, description: threat.description, image: threat.image.url, id: threat.id } })
    }

    const fetchData = async (newPage = 1, refreshing = false) => {
        if (loading) return;

        setLoading(true);
        if (refreshing) setIsRefreshing(true);

        const params = {
            skip: (newPage - 1) * pageSize,
            take: pageSize,
            order: 'asc',
            municipality_id: auth.session?.municipality_id,
        };

        try {
            const response = await Api.get('/threat/mobile', { params });
            const newData = response.data

            setData((prevData) => (refreshing ? newData : [...prevData, ...newData]));
            setHasMore(newData.length === pageSize);
            setPage(newPage)
        } catch(error) {
            console.warn(error)
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }

    const handleRefresh = () => {
        fetchData(1, true);
    }

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            fetchData(page + 1)
        }
    }

    const _renderItem = (item: Threat) => {
        return (
            <ListItem
                key={item.id}
                bottomDivider
                onPress={() => _nextPage(item)}
            >
                <Avatar source={{ uri: _replaceUrlImage(item.image.url) }}/>
                <ListItem.Content>
                    <ListItem.Title style={styles.listTitle}>{item.title}</ListItem.Title>
                    <ListItem.Subtitle style={styles.listSubtitle}>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    const _flatList = (listItems: Array<Threat>) => {
        return (
            <View style={styles.containerList}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={listItems}
                    renderItem={({item}) => _renderItem(item)}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    ListFooterComponent={
                        loading && !isRefreshing ? (
                            <ActivityIndicator size='small' color="#0000ff" style={{ margin: 10 }}/>
                        ) : null
                    }
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <TitleScreen text="Ameaças"/>
            </View>
            <View>
                <SubtitleScreen text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."/>
            </View>
            <View style={styles.containerList}>
                {_flatList(data)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerTitle: {
        paddingTop: 10
    },
    containerList: {
        height: '86%',
        marginTop: 3,
    },
    listTitle: {
        fontWeight: 'bold',
        color: "#3d72de"
    },
    listSubtitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "A4A4A4"
    }
})