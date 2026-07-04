export interface FundingGroup {
  title: string;
  body: string;
  icon: string;
  accent: 'red' | 'blue' | 'gold';
}

// Described generally on purpose — no named programs, amounts, or deadlines.
// Specific programs are tracked privately (grant tracker), not published here,
// because availability and deadlines change constantly.
export const fundingGroups: FundingGroup[] = [
  {
    title: 'Seniors',
    body: 'Federal and community funding supports digital-confidence and online-safety programs for older adults.',
    icon: 'ph:hand-heart-bold',
    accent: 'red',
  },
  {
    title: 'Black-led organizations',
    body: 'Dedicated capacity-building funding helps Black-led and Black-serving organizations grow their programs and their reach.',
    icon: 'ph:buildings-bold',
    accent: 'blue',
  },
  {
    title: 'Indigenous communities',
    body: 'Skills and employment funding, delivered through local Indigenous organizations, supports training rooted in community.',
    icon: 'ph:handshake-bold',
    accent: 'gold',
  },
  {
    title: 'Job seekers and workforce',
    body: 'Youth and employment programs fund the digital and AI skills that help people find and keep good work.',
    icon: 'ph:briefcase-bold',
    accent: 'red',
  },
  {
    title: 'Community organizations and nonprofits',
    body: 'Provincial, foundation, and corporate community grants fund digital-skills programming across the sector.',
    icon: 'ph:users-three-bold',
    accent: 'blue',
  },
];
