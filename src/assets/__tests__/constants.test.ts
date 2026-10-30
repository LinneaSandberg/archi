import { describe, it, expect } from 'vitest'
import { DEFAULT_PROJECT_CONTEXT, SYSTEM_INSTRUCTION } from '../../assets/constants'

describe('constants', () => {
  it('DEFAULT_PROJECT_CONTEXT has required fields', () => {
    expect(DEFAULT_PROJECT_CONTEXT).toMatchObject({
      constructionType: expect.any(String),
      projectType: expect.any(String),
      municipality: expect.any(String),
      zoning: expect.any(String),
      buildingHeight: expect.any(Number),
      distanceToBoundary: expect.any(Number),
      grossFloorArea: expect.any(Number),
      hasElevator: expect.any(Boolean),
      isAccessible: expect.any(Boolean),
      fireClass: expect.any(String),
    })
  })

  it('SYSTEM_INSTRUCTION is a non-empty string', () => {
    expect(typeof SYSTEM_INSTRUCTION).toBe('string')
    expect(SYSTEM_INSTRUCTION.length).toBeGreaterThan(10)
  })
})
