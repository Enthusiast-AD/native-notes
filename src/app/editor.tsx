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