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



--------

import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";

const NoteEditorScreen = () => {
  const colorScheme = useColorScheme();

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const isDark = colorScheme === "dark";

  const theme = isDark
    ? {
        background: "#121212",
        card: "#1E1E1E",
        text: "#FFFFFF",
        subText: "#A1A1AA",
        border: "#2A2A2A",
        accent: "#1F2937",
        toolbar: "#262626",
      }
    : {
        background: "#F5F5F5",
        card: "#FFFFFF",
        text: "#111827",
        subText: "#6B7280",
        border: "#E5E7EB",
        accent: "#111827",
        toolbar: "#F3F4F6",
      };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
            <ImageBackground
              source={require("@/assets/images/lightMountains.jpg")}
              style={styles.imageContainer}
              resizeMode="cover"
            >

            <View style={styles.topBar}>
              <Pressable
                style={[
                  styles.backButton,
                  {
                    backgroundColor:
                      isDark
                        ? "rgba(30,30,30,0.8)"
                        : "rgba(255,255,255,0.8)",
                  },
                ]}
              >
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={theme.text}
                />
              </Pressable>

              <Pressable
                style={[
                  styles.saveButton,
                  {
                    backgroundColor:
                      theme.accent,
                  },
                ]}
              >
                <Text
                  style={styles.saveButtonText}
                >
                  Save
                </Text>
              </Pressable>
            </View>
          </ImageBackground>

          <View
            style={[
              styles.editorContainer,
              {
                backgroundColor: theme.card,
              },
            ]}
          >
            <View
              style={[
                styles.dragHandle,
                {
                  backgroundColor:
                    theme.border,
                },
              ]}
            />

            <TextInput
              placeholder="Title of your note..."
              placeholderTextColor={
                theme.subText
              }
              value={title}
              onChangeText={setTitle}
              style={[
                styles.titleInput,
                {
                  color: theme.text,
                  fontSize: isTablet
                    ? 34
                    : 28,
                },
              ]}
            />

            <TextInput
              placeholder="Add a title..."
              placeholderTextColor={
                theme.subText
              }
              style={[
                styles.subtitleInput,
                {
                  color: theme.subText,
                  borderBottomColor:
                    theme.border,
                },
              ]}
            />

            {/* TOOLBAR */}
            <View
              style={[
                styles.toolbar,
                {
                  backgroundColor:
                    theme.toolbar,
                  borderColor:
                    theme.border,
                },
              ]}
            >
              <Pressable
                style={styles.toolButton}
              >
                <Text
                  style={[
                    styles.boldText,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  B
                </Text>
              </Pressable>

              <Pressable
                style={styles.toolButton}
              >
                <Text
                  style={[
                    styles.italicText,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  I
                </Text>
              </Pressable>

              <Pressable
                style={styles.toolButton}
              >
                <Text
                  style={[
                    styles.underlineText,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  U
                </Text>
              </Pressable>

              <Pressable
                style={styles.toolButton}
              >
                <Ionicons
                  name="list"
                  size={20}
                  color={theme.text}
                />
              </Pressable>

              <Pressable
                style={styles.toolButton}
              >
                <Feather
                  name="image"
                  size={18}
                  color={theme.text}
                />
              </Pressable>
            </View>

            <TextInput
              placeholder="Start writing your note here..."
              placeholderTextColor={
                theme.subText
              }
              multiline
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
              style={[
                styles.noteInput,
                {
                  color: theme.text,
                  fontSize: isTablet
                    ? 20
                    : 16,
                },
              ]}
            />

            {!note && (
              <View
                style={styles.defaultTextContainer}
              >
                <Text
                  style={[
                    styles.defaultText,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Notes help us capture
                  thoughts, organize ideas
                  and stay productive.
                </Text>

                <Text
                  style={[
                    styles.defaultText,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  This is a simple and
                  beautiful notes editor
                  built with React Native
                  and Expo.
                </Text>

                <Text
                  style={[
                    styles.defaultText,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Focus on your thoughts
                  and let your ideas flow
                  freely...
                </Text>
              </View>
            )}
            <View style={styles.footer}>
              <View
                style={styles.footerLeft}
              >
                <Ionicons
                  name="document-text-outline"
                  size={16}
                  color={theme.subText}
                />

                <Text
                  style={[
                    styles.footerText,
                    {
                      color:
                        theme.subText,
                    },
                  ]}
                >
                  {
                    note.length
                  }{" "}
                  characters
                </Text>
              </View>

              <View
                style={styles.footerRight}
              >
                <Text
                  style={[
                    styles.footerText,
                    {
                      color:
                        theme.subText,
                    },
                  ]}
                >
                  Last saved just now
                </Text>

                <View
                  style={styles.greenDot}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    height: 280,
    position: "relative",
  },

  topBar: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },

  editorContainer: {
    flex: 1,
    marginTop: -35,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 30,
  },

  dragHandle: {
    width: 55,
    height: 6,
    borderRadius: 999,
    alignSelf: "center",
    marginBottom: 25,
  },

  titleInput: {
    fontWeight: "bold",
  },

  subtitleInput: {
    marginTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    fontSize: 15,
  },

  toolbar: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
  },

  toolButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: "#D1D5DB",
  },

  boldText: {
    fontWeight: "bold",
    fontSize: 17,
  },

  italicText: {
    fontStyle: "italic",
    fontSize: 17,
  },

  underlineText: {
    textDecorationLine: "underline",
    fontSize: 17,
  },

  noteInput: {
    marginTop: 24,
    lineHeight: 30,
  },

  defaultTextContainer: {
    gap: 24,
  },

  defaultText: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "500",
  },

  footer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  footerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  footerText: {
    fontSize: 12,
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#22C55E",
  },
});