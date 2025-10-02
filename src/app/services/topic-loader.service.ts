import { Injectable } from '@angular/core';
import { Topic, Section } from '../models/section';

@Injectable({
  providedIn: 'root',
})
export class TopicLoaderService {
  constructor() {}

  /**
   * Load all topics from the sections directory
   */
  async loadAllTopics(): Promise<Topic[]> {
    const topics: Topic[] = [];

    // Load beginner topics
    const beginnerTopics = await this.loadBeginnerTopics();
    topics.push(...beginnerTopics);

    // Load intermediate topics
    const intermediateTopics = await this.loadIntermediateTopics();
    topics.push(...intermediateTopics);

    // Load advanced topics
    const advancedTopics = await this.loadAdvancedTopics();
    topics.push(...advancedTopics);

    return topics;
  }

  /**
   * Load beginner section topics
   */
  private async loadBeginnerTopics(): Promise<Topic[]> {
    const topics: Topic[] = [];

    try {
      // Dynamically import all beginner topics
      const variablesTopic = await import(
        '../sections/beginner/variables.topic'
      );
      topics.push(variablesTopic.variablesTopic);

      const operatorsTopic = await import(
        '../sections/beginner/operators.topic'
      );
      topics.push(operatorsTopic.operatorsTopic);

      const typeConversionTopic = await import(
        '../sections/beginner/type-conversion.topic'
      );
      topics.push(typeConversionTopic.typeConversionTopic);

      // Add more beginner topics as they are created
      const consoleIoTopic = await import(
        '../sections/beginner/console-io.topic'
      );
      topics.push(consoleIoTopic.consoleIoTopic);

      const commentsTopic = await import('../sections/beginner/comments.topic');
      topics.push(commentsTopic.commentsTopic);

      const ifStatementsTopic = await import(
        '../sections/beginner/if-statements.topic'
      );
      topics.push(ifStatementsTopic.ifStatementsTopic);

      const switchStatementsTopic = await import(
        '../sections/beginner/switch-statements.topic'
      );
      topics.push(switchStatementsTopic.switchStatementsTopic);

      const loopsTopic = await import('../sections/beginner/loops.topic');
      topics.push(loopsTopic.loopsTopic);

      const methodsTopic = await import('../sections/beginner/methods.topic');
      topics.push(methodsTopic.methodsTopic);

      const methodOverloadingTopic = await import(
        '../sections/beginner/method-overloading.topic'
      );
      topics.push(methodOverloadingTopic.methodOverloadingTopic);

      const singleDimensionalArraysTopic = await import(
        '../sections/beginner/single-dimensional-arrays.topic'
      );
      topics.push(singleDimensionalArraysTopic.singleDimensionalArraysTopic);

      const multiDimensionalArraysTopic = await import(
        '../sections/beginner/multi-dimensional-arrays.topic'
      );
      topics.push(multiDimensionalArraysTopic.multiDimensionalArraysTopic);

      const stringOperationsTopic = await import(
        '../sections/beginner/string-operations.topic'
      );
      topics.push(stringOperationsTopic.stringOperationsTopic);
    } catch (error) {
      console.error('Error loading beginner topics:', error);
    }

    return topics;
  }

  /**
   * Load intermediate section topics
   */
  private async loadIntermediateTopics(): Promise<Topic[]> {
    const topics: Topic[] = [];

    try {
      // Dynamically import all intermediate topics
      const inheritanceTopic = await import(
        '../sections/intermediate/inheritance.topic'
      );
      topics.push(inheritanceTopic.inheritanceTopic);

      const polymorphismTopic = await import(
        '../sections/intermediate/polymorphism.topic'
      );
      topics.push(polymorphismTopic.polymorphismTopic);

      const interfacesAbstractClassesTopic = await import(
        '../sections/intermediate/interfaces-abstract-classes.topic'
      );
      topics.push(
        interfacesAbstractClassesTopic.interfacesAbstractClassesTopic
      );

      const collectionsTopic = await import(
        '../sections/intermediate/collections.topic'
      );
      topics.push(collectionsTopic.collectionsTopic);

      const linqTopic = await import('../sections/intermediate/linq.topic');
      topics.push(linqTopic.linqTopic);

      const delegatesTopic = await import(
        '../sections/intermediate/delegates.topic'
      );
      topics.push(delegatesTopic.delegatesTopic);

      const fileHandlingTopic = await import(
        '../sections/intermediate/file-handling.topic'
      );
      topics.push(fileHandlingTopic.fileHandlingTopic);

      const exceptionHandlingTopic = await import(
        '../sections/intermediate/exception-handling.topic'
      );
      topics.push(exceptionHandlingTopic.exceptionHandlingTopic);

      const structsEnumsTopic = await import(
        '../sections/intermediate/structs-enums.topic'
      );
      topics.push(structsEnumsTopic.structsEnumsTopic);
    } catch (error) {
      console.error('Error loading intermediate topics:', error);
    }

    return topics;
  }

  /**
   * Load advanced section topics
   */
  private async loadAdvancedTopics(): Promise<Topic[]> {
    const topics: Topic[] = [];

    try {
      // Add advanced topics here as they are created
      const abstractClassesInterfacesTopic = await import(
        '../sections/advanced/abstract-classes-interfaces-deep-dive.topic'
      );
      topics.push(
        abstractClassesInterfacesTopic.abstractClassesInterfacesDeepDiveTopic
      );

      const polymorphismScenariosTopic = await import(
        '../sections/advanced/polymorphism-scenarios.topic'
      );
      topics.push(polymorphismScenariosTopic.polymorphismScenariosTopic);

      const solidPrinciplesTopic = await import(
        '../sections/advanced/solid-principles.topic'
      );
      topics.push(solidPrinciplesTopic.solidPrinciplesTopic);

      const genericsDeepDiveTopic = await import(
        '../sections/advanced/generics-deep-dive.topic'
      );
      topics.push(genericsDeepDiveTopic.genericsDeepDiveTopic);

      const delegatesLambdaTopic = await import(
        '../sections/advanced/delegates-lambda.topic'
      );
      topics.push(delegatesLambdaTopic.delegatesLambdaTopic);

      const eventsObserversTopic = await import(
        '../sections/advanced/events-observers.topic'
      );
      topics.push(eventsObserversTopic.eventsObserversTopic);

      const asyncProgrammingTopic = await import(
        '../sections/advanced/async-programming.topic'
      );
      topics.push(asyncProgrammingTopic.asyncProgrammingTopic);

      const advancedLinqTopic = await import(
        '../sections/advanced/advanced-linq.topic'
      );
      topics.push(advancedLinqTopic.advancedLinqTopic);

      const reflectionAttributesTopic = await import(
        '../sections/advanced/reflection-attributes.topic'
      );
      topics.push(reflectionAttributesTopic.reflectionAttributesTopic);

      const memoryManagementTopic = await import(
        '../sections/advanced/memory-management.topic'
      );
      topics.push(memoryManagementTopic.memoryManagementTopic);

      const threadingTopic = await import(
        '../sections/advanced/threading.topic'
      );
      topics.push(threadingTopic.threadingTopic);

      const designPatternsTopic = await import(
        '../sections/advanced/design-patterns.topic'
      );
      topics.push(designPatternsTopic.designPatternsTopic);

      const fileSerializationTopic = await import(
        '../sections/advanced/file-serialization.topic'
      );
      topics.push(fileSerializationTopic.fileSerializationTopic);

      const advancedFeaturesTopic = await import(
        '../sections/advanced/advanced-features.topic'
      );
      topics.push(advancedFeaturesTopic.advancedFeaturesTopic);
    } catch (error) {
      console.error('Error loading advanced topics:', error);
    }

    return topics;
  }

  /**
   * Get sections with their topics loaded
   */
  async getSections(): Promise<Section[]> {
    const topics = await this.loadAllTopics();

    const sections: Section[] = [
      {
        id: 'beginner',
        name: 'Beginner',
        slug: 'beginner',
        description: 'Foundational concepts for those new to programming or C#',
        topics: topics.filter((t) => t.sectionId === 'beginner'),
      },
      {
        id: 'intermediate',
        name: 'Intermediate',
        slug: 'intermediate',
        description: 'Build on your knowledge with more advanced concepts',
        topics: topics.filter((t) => t.sectionId === 'intermediate'),
      },
      {
        id: 'advanced',
        name: 'Advanced',
        slug: 'advanced',
        description: 'Master complex programming techniques and patterns',
        topics: topics.filter((t) => t.sectionId === 'advanced'),
      },
    ];

    return sections;
  }
}
