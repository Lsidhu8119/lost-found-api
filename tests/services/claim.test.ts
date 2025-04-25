import * as claimService from '../../src/api/v1/services/claimService';

describe('Claim Service', () => {
  let createdClaimId: string;

  it('should return all claims', async () => {
    const result = await claimService.getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new claim', async () => {
    const data = {
      itemId: 'abc321',
      claimantName: 'Lovedeep Sidhu',
      claimantEmail: 'lovedeep@gmail.com',
      justification: 'I can verify the USB serial number',
      dateClaimed: '2025-04-12',
    };
    const newClaim = await claimService.create(data);
    expect(newClaim).toHaveProperty('id');
    expect(newClaim.claimantName).toBe('Lovedeep Sidhu');
    createdClaimId = newClaim.id;
  });

  it('should update an existing claim', async () => {
    const updated = await claimService.update(createdClaimId, {
      justification: 'Updated justification for verification',
    });
    expect(updated).not.toBeNull();
    expect(updated?.justification).toBe('Updated justification for verification');
  });

  it('should return null when updating non-existing claim', async () => {
    const result = await claimService.update('nonexistent-id', {
      justification: 'Invalid update',
    });
    expect(result).toBeNull();
  });

  it('should delete an existing claim', async () => {
    const deleted = await claimService.remove(createdClaimId);
    expect(deleted).toBe(true);
  });

  it('should return false when deleting non-existing claim', async () => {
    const deleted = await claimService.remove('nonexistent-id');
    expect(deleted).toBe(false);
  });
});
