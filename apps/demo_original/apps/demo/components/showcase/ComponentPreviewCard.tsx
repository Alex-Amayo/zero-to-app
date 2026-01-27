import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Typography } from 'zero-to-app';
import { ComponentData } from './componentData';
import { CodeExample } from './CodeExample';
import { PropsTable } from './PropsTable';
import { PreviewContainer } from './PreviewContainer';

interface ComponentPreviewCardProps {
  component: ComponentData;
}

type TabType = 'preview' | 'code' | 'props';

export const ComponentPreviewCard: React.FC<ComponentPreviewCardProps> = ({ component }) => {
  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' },
    { id: 'props', label: 'Props' },
  ];

  const currentExample = component.examples[selectedExampleIndex];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Typography variant="bodyLarge" weight="bold">
            {component.name}
          </Typography>
          <View style={styles.badge}>
            <Typography variant="labelSmall" color="#ff5757">
              {component.category}
            </Typography>
          </View>
        </View>
        <Typography variant="bodySmall" muted style={styles.description}>
          {component.description}
        </Typography>
      </View>

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}>
            <Typography
              variant="bodySmall"
              weight={activeTab === tab.id ? 'bold' : 'regular'}
              color={activeTab === tab.id ? '#ff5757' : undefined}>
              {tab.label}
            </Typography>
          </Pressable>
        ))}
      </View>

      <View style={styles.content}>
        {activeTab === 'preview' && (
          <>
            {component.examples.length > 1 && (
              <View style={styles.exampleSelector}>
                {component.examples.map((example, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedExampleIndex(index)}
                    style={[
                      styles.exampleButton,
                      selectedExampleIndex === index && styles.activeExampleButton,
                    ]}>
                    <Typography
                      variant="labelSmall"
                      color={selectedExampleIndex === index ? '#fff' : '#ff5757'}>
                      {example.title}
                    </Typography>
                  </Pressable>
                ))}
              </View>
            )}
            <PreviewContainer>{currentExample?.preview()}</PreviewContainer>
            {currentExample?.description && (
              <Typography variant="bodySmall" muted style={styles.exampleDescription}>
                {currentExample.description}
              </Typography>
            )}
          </>
        )}

        {activeTab === 'code' && (
          <>
            {component.examples.length > 1 && (
              <View style={styles.exampleSelector}>
                {component.examples.map((example, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedExampleIndex(index)}
                    style={[
                      styles.exampleButton,
                      selectedExampleIndex === index && styles.activeExampleButton,
                    ]}>
                    <Typography
                      variant="labelSmall"
                      color={selectedExampleIndex === index ? '#fff' : '#ff5757'}>
                      {example.title}
                    </Typography>
                  </Pressable>
                ))}
              </View>
            )}
            <View style={styles.importSection}>
              <Typography variant="bodySmall" weight="bold" style={styles.importLabel}>
                Import:
              </Typography>
              <CodeExample code={component.import} />
            </View>
            <View style={styles.codeSection}>
              <Typography variant="bodySmall" weight="bold" style={styles.codeLabel}>
                Example:
              </Typography>
              <CodeExample code={currentExample?.code || ''} />
            </View>
          </>
        )}

        {activeTab === 'props' && <PropsTable props={component.props} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  description: {
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: 8,
  },
  activeTab: {
    borderBottomColor: '#ff5757',
  },
  content: {
    minHeight: 150,
  },
  exampleSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  exampleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ff5757',
    backgroundColor: 'transparent',
  },
  activeExampleButton: {
    backgroundColor: '#ff5757',
  },
  exampleDescription: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  importSection: {
    marginBottom: 16,
  },
  importLabel: {
    marginBottom: 8,
  },
  codeSection: {
    marginTop: 8,
  },
  codeLabel: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ececec',
    marginBottom: 12,
  },
});
