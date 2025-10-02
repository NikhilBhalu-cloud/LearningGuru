import { Injectable } from '@angular/core';
import { Topic, Section } from '../models/section';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, filter, take } from 'rxjs/operators';
import { TopicLoaderService } from './topic-loader.service';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  private sections: Section[] = [];
  private _allTopics: Topic[] = [];
  private _isLoaded$ = new BehaviorSubject<boolean>(false);

  constructor(private topicLoader: TopicLoaderService) {
    this.initializeData();
  }

  private async initializeData() {
    try {
      this.sections = await this.topicLoader.getSections();
      this._allTopics = await this.topicLoader.loadAllTopics();
      this._isLoaded$.next(true);
    } catch (error) {
      console.error('Error loading topics:', error);
      this._isLoaded$.next(true); // Still mark as loaded even on error
    }
  }

  getTopicsBySection(section: string): Observable<Topic[]> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => this._allTopics.filter((topic) => topic.sectionId === section))
    );
  }

  getAllTopics(): Observable<Topic[]> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => this._allTopics)
    );
  }

  getTopicById(id: string): Observable<Topic | undefined> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => this._allTopics.find((topic) => topic.id === id))
    );
  }

  getTopicByIndex(index: number): Observable<Topic | undefined> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => this._allTopics[index])
    );
  }

  getNextTopic(currentId: string): Observable<Topic | undefined> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => {
        const currentIndex = this._allTopics.findIndex(
          (topic) => topic.id === currentId
        );
        if (currentIndex !== -1 && currentIndex < this._allTopics.length - 1) {
          return this._allTopics[currentIndex + 1];
        }
        return undefined;
      })
    );
  }

  getPreviousTopic(currentId: string): Observable<Topic | undefined> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => {
        const currentIndex = this._allTopics.findIndex(
          (topic) => topic.id === currentId
        );
        if (currentIndex > 0) {
          return this._allTopics[currentIndex - 1];
        }
        return undefined;
      })
    );
  }

  getTopicProgress(currentId: string): {
    current: number;
    total: number;
    section: string;
  } {
    // This method is synchronous and used in templates, so we need to handle it differently
    const currentTopic = this._allTopics.find((t) => t.id === currentId);
    if (!currentTopic) {
      return { current: 0, total: 0, section: 'Unknown' };
    }

    const section = this.sections.find((s) => s.id === currentTopic.sectionId);
    if (!section) {
      return { current: 0, total: 0, section: 'Unknown' };
    }

    const topicIndex = section.topics.findIndex((t) => t.id === currentId);
    return {
      current: topicIndex + 1,
      total: section.topics.length,
      section: section.name,
    };
  }

  getFirstTopic(): Observable<Topic | undefined> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => {
        if (this.sections.length > 0 && this.sections[0].topics.length > 0) {
          return this.sections[0].topics[0];
        }
        return undefined;
      })
    );
  }

  // Additional methods for section management
  getAllSections(): Observable<Section[]> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => this.sections)
    );
  }

  getSectionById(id: string): Observable<Section | undefined> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => this.sections.find((section) => section.id === id))
    );
  }

  getSectionBySlug(slug: string): Observable<Section | undefined> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => this.sections.find((section) => section.slug === slug))
    );
  }

  getTopicBySlug(
    sectionSlug: string,
    topicSlug: string
  ): Observable<Topic | undefined> {
    return this._isLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      map(() => {
        const section = this.sections.find((s) => s.slug === sectionSlug);
        if (section) {
          return section.topics.find((t) => t.slug === topicSlug);
        }
        return undefined;
      })
    );
  }
}
