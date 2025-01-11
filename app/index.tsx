import { View, StyleSheet, FlatList } from "react-native";
import { TitleScreen } from "../components/titles/TitleScreen";
import { SubtitleScreen } from "../components/titles/SubtitleScreen";
import { useEffect, useState } from "react";
import Api from "../services/api";
import { Avatar, ListItem } from "@rneui/base";
import { router, useRouter } from 'expo-router'
import { BACKEND_URL, HOST_URL } from "../constants/backend_url";

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

export default function Home({ navigation }: { navigation: any }) {

    const params = {
        skip: 0,
        take: 10,
        order: 'asc',
        municipality_id: "4a9f4a10-6045-4bde-9f9f-b8ed3a43e135"
    }

    const router = useRouter()

    const [data, setData] = useState<Array<Threat>>([]);

    useEffect(() => {
        Api.get('/threat/mobile', { params })
            .then((response) => {
                // console.warn(response, "batendo aqui")
                setData(response.data)
            })
            .catch((error) => {
                console.warn(error)
            })
    }, [])

    const _replaceUrlImage = (url: string) => {
        const parts = url.split(HOST_URL)
        return parts.join(BACKEND_URL);
    }


    const _renderItem = (item: Threat) => {
        return (
            <ListItem
                key={item.id}
                bottomDivider
                // onPress={() => router.push({ pathname: '/info', params: { id: item.id, title: item.title, description: item.description, image: _replaceUrlImage(item.image.url) } })}
            >
                <Avatar source={{uri: _replaceUrlImage(item.image.url)}}/>
                <ListItem.Content>
                    <ListItem.Title style={styles.listTitle}>{item.title}</ListItem.Title>
                    <ListItem.Subtitle style={styles.listSubtitle}>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    const _flatList = (listItens: Array<Threat>) => {
        return (
            <View style={styles.containerList}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={listItens}
                    renderItem={({ item }) => _renderItem(item)}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <TitleScreen>Ameaças</TitleScreen>
            </View>
            <View style={styles.container}>
                <SubtitleScreen>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </SubtitleScreen>
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
    containerList: {
        height: 565,
        marginTop: 5,
        marginRight: 5,
        marginLeft: 2
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