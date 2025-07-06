import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

type AlbumDetailsProps = {
  id: string;
};

const AlbumDetails = ({ id }: AlbumDetailsProps) => {
  const [detailedAlbum, setAlbums] = useState<
    {
      albumId: number;
      id: number;
      title: string;
      url: string;
      thumbnailUrl: string;
    }[]
  >([]);
  const [imageLoading, setImageLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${id}&_start=0&_limit=20`
    )
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading)
    return (
      <View style={styles.imageContainer}>
        {loading && (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        )}
      </View>
    );
  else
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>
          Album ID {detailedAlbum[Number(id)]?.albumId}
        </Text>
        <Text style={styles.title}>{detailedAlbum[Number(id)]?.title}</Text>

        <View style={styles.imageContainer}>
          {imageLoading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="large"
              color="#0000ff"
            />
          )}
          <Image
            style={styles.image}
            source={{
              uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.dookinternational.com%2Fwp-content%2Fuploads%2F2016%2F11%2FMoscow-Kremlin-2.jpg&f=1&nofb=1&ipt=8c18aa759a0aa459f9f2aadcdc5647dc32fa1517c63a14f0ce0db5df58bace9c",
            }}
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  loadingIndicator: {
    position: "absolute",
    zIndex: 1,
  },
});

export default AlbumDetails;
