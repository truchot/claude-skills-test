/**
 * Web Agency State Manager
 *
 * Main exports for programmatic usage
 */

export { StateManager, getStateManager, resetStateManager } from './StateManager';

export {
  // Enums
  ProjectStatus,
  TaskStatus,
  TaskPriority,
  SkillLevel,

  // Main interfaces
  Project,
  Client,
  TechStack,
  Budget,
  Phase,
  Task,
  Deliverable,

  // Events
  ProjectEvent,
  EventType,
  EventCategory,

  // Metrics
  ProjectMetrics,
  SkillUsage,

  // Config & Query
  StateManagerConfig,
  QueryOptions,
  StateSnapshot,
} from '../types/project';
