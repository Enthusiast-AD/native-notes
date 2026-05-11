import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const NOTES = [
  {
    id: 1,
    title: "Daily Goals",
    description:
      "Complete React Native UI, revise DSA trees, and push the latest code to GitHub.",
    date: "11 May 2026",
    time: "8:00 AM",
  },
  {
    id: 2,
    title: "Startup Notes",
    description:
      "Focus on productivity tools for students with AI-powered study recommendations.",
    date: "12 May 2026",
    time: "6:45 PM",
  },
  {
    id: 3,
    title: "Meeting Summary",
    description:
      "Discussed app onboarding screens, authentication flow, and backend deployment strategy.",
    date: "13 May 2026",
    time: "3:15 PM",
  },
  {
    id: 4,
    title: "Design Inspiration",
    description:
      "Minimal interfaces with soft colors, rounded cards, and smooth animations feel modern.",
    date: "14 May 2026",
    time: "10:20 AM",
  },
  {
    id: 5,
    title: "Hackathon Plan",
    description:
      "Build a collaborative whiteboard app with real-time chat and AI-generated summaries.",
    date: "15 May 2026",
    time: "9:00 PM",
  },
];

const HomeScreen = () => {
  const colorScheme = useColorScheme();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const [manualDark, setManualDark] =
    useState<boolean | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const isDark =
    manualDark !== null
      ? manualDark
      : colorScheme === "dark";

  const theme = isDark
    ? {
        background: "#121212",
        card: "#1E1E1E",
        text: "#FFFFFF",
        subText: "#A1A1AA",
        border: "#2A2A2A",
        searchBg: "#1F1F1F",
        switchBg: "#262626",
      }
    : {
        background: "#FFFFFF",
        card: "#F3F4F6",
        text: "#111827",
        subText: "#6B7280",
        border: "#E5E7EB",
        searchBg: "#F9FAFB",
        switchBg: "#F3F4F6",
      };

    const filteredNotes = NOTES.filter((note) => {
    const query = searchQuery.toLowerCase();

    return (
      note.title.toLowerCase().includes(query) ||
      note.description.toLowerCase().includes(query)
      );
    });

  const renderNote = ({ item }: any) => {
    return (
      <Pressable
        style={{
          width: isTablet ? "48%" : "100%",
        }}
      >
        <View
          style={[
            styles.noteCard,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <View style={styles.noteContent}>
            <Text
              style={[
                styles.noteTitle,
                {
                  color: theme.text,
                  fontSize: isTablet ? 22 : 18,
                },
              ]}
            >
              {item.title}
            </Text>

            <Text
              numberOfLines={3}
              style={[
                styles.noteDescription,
                {
                  color: theme.subText,
                  fontSize: isTablet ? 15 : 13,
                },
              ]}
            >
              {item.description}
            </Text>

            <View style={styles.dateRow}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color={theme.subText}
              />

              <Text
                style={[
                  styles.noteDate,
                  { color: theme.subText },
                ]}
              >
                {item.date} • {item.time}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingHorizontal: isTablet ? 40 : 18,
        },
      ]}
    >
      <StatusBar
        barStyle={
          isDark
            ? "light-content"
            : "dark-content"
        }
      />
      
      <FlatList
        data={filteredNotes}
        key={isTablet ? "tablet" : "phone"}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={
          isTablet
            ? {
                justifyContent: "space-between",
              }
            : undefined
        }
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderNote}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text
                  style={[
                    styles.greeting,
                    {
                      color: theme.text,
                      fontSize: isTablet ? 28 : 22,
                    },
                  ]}
                >
                  Good Evening,
                </Text>

                <Text
                  style={[
                    styles.username,
                    {
                      color: theme.text,
                      fontSize: isTablet ? 42 : 30,
                    },
                  ]}
                >
                  Ansh 👋
                </Text>

                <Text
                  style={[
                    styles.subtitle,
                    {
                      color: theme.subText,
                      fontSize: isTablet ? 18 : 14,
                    },
                  ]}
                >
                  Your ideas, your space
                </Text>
              </View>

              <View
                style={[
                  styles.switchWrapper,
                  {
                    backgroundColor:
                      theme.switchBg,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Ionicons
                  name={
                    isDark
                      ? "moon-outline"
                      : "sunny-outline"
                  }
                  size={isTablet ? 28 : 22}
                  color={theme.text}
                />

                <Switch
                  value={isDark}
                  onValueChange={setManualDark}
                  trackColor={{
                    false: "#D1D5DB",
                    true: "#111827",
                  }}
                  thumbColor="#FFFFFF"
                  ios_backgroundColor="#D1D5DB"
                />
              </View>
            </View>

            <View
              style={[
                styles.searchContainer,
                {
                  backgroundColor:
                    theme.searchBg,
                  borderColor: theme.border,
                },
              ]}
            >
              <Ionicons
                name="search"
                size={22}
                color={theme.subText}
                style={styles.searchIcon}
              />

              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                  Platform.OS === "ios"
                    ? "padding"
                    : "height"
                }
              >
                <TextInput
                  placeholder="Search notes..."
                  placeholderTextColor={theme.subText}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      fontSize: isTablet ? 18 : 15,
                    },
                  ]}
                />
              </KeyboardAvoidingView>

              <Ionicons
                name="options"
                size={22}
                color={theme.subText}
              />
            </View>

            <View style={styles.sectionRow}>
              <View style={styles.sectionLeft}>
                <Icon
                  name="thumb-tack"
                  size={18}
                  color={
                    isDark
                      ? "#FFFFFF"
                      : "#111827"
                  }
                  style={styles.pinIcon}
                />

                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.text,
                      fontSize: isTablet
                        ? 20
                        : 15,
                    },
                  ]}
                >
                  Pinned
                </Text>
              </View>

              <Text
                style={[
                  styles.sectionRightText,
                  {
                    color: theme.subText,
                    fontSize: isTablet
                      ? 16
                      : 13,
                  },
                ]}
              >
                See all
              </Text>
            </View>

            <Pressable>
              <View
                style={[
                  styles.noteCard,
                  {
                    backgroundColor:
                      theme.card,
                  },
                ]}
              >
                <View
                  style={{
                    width: isTablet
                      ? "75%"
                      : "70%",
                  }}
                >
                  <Text
                    style={[
                      styles.noteTitle,
                      {
                        color: theme.text,
                        fontSize: isTablet
                          ? 26
                          : 18,
                      },
                    ]}
                  >
                    Project Ideas
                  </Text>

                  <Text
                    numberOfLines={3}
                    style={[
                      styles.noteDescription,
                      {
                        color:
                          theme.subText,
                        fontSize: isTablet
                          ? 16
                          : 13,
                      },
                    ]}
                  >
                    A platform that connects
                    mentors and learners
                    across the globe. Clean
                    design, smooth
                    experience.
                  </Text>

                  <View style={styles.dateRow}>
                    <Ionicons
                      name="calendar-outline"
                      size={14}
                      color={theme.subText}
                    />

                    <Text
                      style={[
                        styles.noteDate,
                        {
                          color:
                            theme.subText,
                          fontSize:
                            isTablet
                              ? 14
                              : 11,
                        },
                      ]}
                    >
                      10 May 2026 • 1:30 PM
                    </Text>
                  </View>
                </View>

                <Image
                  source={require("@/assets/images/mountainsbg.png")}
                  style={[
                    styles.mountainImage,
                    {
                      width: isTablet
                        ? 180
                        : 120,
                      height: isTablet
                        ? 180
                        : 120,
                    },
                  ]}
                  resizeMode="contain"
                />
              </View>
            </Pressable>

            <View style={styles.sectionRow}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: theme.text,
                    fontSize: isTablet
                      ? 20
                      : 15,
                  },
                ]}
              >
                All Notes
              </Text>

              <Text
                style={[
                  styles.sectionRightText,
                  {
                    color: theme.subText,
                    fontSize: isTablet
                      ? 16
                      : 13,
                  },
                ]}
              >
                {filteredNotes.length} Notes
              </Text>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },

  headerLeft: {
    flex: 1,
  },

  greeting: {
    fontWeight: "500",
  },

  username: {
    fontWeight: "bold",
    marginTop: 2,
  },

  subtitle: {
    marginTop: 2,
  },

  switchWrapper: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 8,
    gap: 8,
  },

  searchContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
  },

  searchIcon: {
    marginRight: 10,
  },

  input: {},

  sectionRow: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sectionTitle: {
    fontWeight: "bold",
  },

  sectionRightText: {},

  pinIcon: {
    transform: [{ rotate: "45deg" }],
  },

  noteCard: {
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },

  noteContent: {
    width: "85%",
  },

  noteTitle: {
    fontWeight: "bold",
  },

  noteDescription: {
    marginTop: 10,
    lineHeight: 20,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },

  noteDate: {},

  mountainImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    opacity: 0.35,
  },
});