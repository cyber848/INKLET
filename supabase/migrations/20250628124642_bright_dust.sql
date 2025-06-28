/*
  # Seed Initial Data for Inklet Poetry Platform

  1. Categories
    - Create default categories for poems and blog posts

  2. Sample Content
    - Add sample poems and blog posts for demonstration
    - Set up featured content
*/

-- Insert default categories
INSERT INTO categories (name, description, slug) VALUES
  ('Nature', 'Poems and articles about the natural world, landscapes, and environmental themes', 'nature'),
  ('Urban', 'City life, metropolitan experiences, and urban culture', 'urban'),
  ('Memory', 'Reflections on the past, nostalgia, and remembrance', 'memory'),
  ('Philosophy', 'Deep thoughts, existential themes, and philosophical musings', 'philosophy'),
  ('Love', 'Romance, relationships, and matters of the heart', 'love'),
  ('Social', 'Commentary on society, politics, and human relationships', 'social'),
  ('Experimental', 'Avant-garde, innovative forms, and creative expression', 'experimental'),
  ('Traditional', 'Classic forms, sonnets, haikus, and traditional poetry', 'traditional')
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for reference
DO $$
DECLARE
  nature_id uuid;
  urban_id uuid;
  memory_id uuid;
  philosophy_id uuid;
  love_id uuid;
BEGIN
  SELECT id INTO nature_id FROM categories WHERE slug = 'nature';
  SELECT id INTO urban_id FROM categories WHERE slug = 'urban';
  SELECT id INTO memory_id FROM categories WHERE slug = 'memory';
  SELECT id INTO philosophy_id FROM categories WHERE slug = 'philosophy';
  SELECT id INTO love_id FROM categories WHERE slug = 'love';

  -- Insert sample poems
  INSERT INTO poems (title, content, excerpt, author_name, author_bio, category_id, tags, featured, published, likes_count, views_count) VALUES
    (
      'Whispers of Dawn',
      E'In the quiet hours before sunrise,\nwhen the world holds its breath\nand dreams linger in the silver air,\nI find myself walking\nthrough corridors of memory,\neach step echoing\nwith the whispers of dawn.\n\nThe sky blushes pink\nlike a secret being told,\nand I am reminded\nthat every ending\nis just another beginning\nwaiting to unfold.',
      'In the quiet hours before sunrise, when the world holds its breath and dreams linger in the silver air...',
      'Sarah Chen',
      'Sarah Chen is a contemporary poet whose work explores the intersection of nature and human emotion.',
      nature_id,
      ARRAY['dawn', 'memories', 'hope', 'nature'],
      true,
      true,
      23,
      187
    ),
    (
      'City Rhythms',
      E'Concrete jungle pulses with life,\neach step a beat\nin the urban symphony\nthat never sleeps.\n\nNeon signs flicker\nlike electric poetry,\nwhile strangers pass\ncarrying stories\nin their hurried steps.\n\nThe city breathes\nthrough subway grates,\nexhales the dreams\nof millions,\ninhales the hope\nof tomorrow''s rush.',
      'Concrete jungle pulses with life, each step a beat in the urban symphony that never sleeps...',
      'Marcus Johnson',
      'Marcus Johnson captures the essence of metropolitan life through vivid imagery and rhythmic verse.',
      urban_id,
      ARRAY['city', 'life', 'rhythm', 'urban'],
      false,
      true,
      15,
      142
    ),
    (
      'Memory''s Garden',
      E'In the garden of remembrance,\nflowers bloom in sepia tones,\neach petal a moment preserved\nin the amber of time.\n\nI tend to these memories\nwith gentle hands,\nwatering them with tears\nof joy and sorrow,\nwatching as they grow\ninto something beautiful.\n\nSome wilt with age,\nothers stand eternal,\nbut all belong\nto this sacred space\nwhere love lives on\nin whispered names.',
      'In the garden of remembrance, flowers bloom in sepia tones, each petal a moment preserved...',
      'Elena Rodriguez',
      'Elena Rodriguez writes with profound sensitivity about memory, loss, and the enduring power of love.',
      memory_id,
      ARRAY['memory', 'love', 'time', 'garden'],
      true,
      true,
      31,
      203
    ),
    (
      'Storm''s Eye',
      E'Within the chaos of the tempest,\nthere exists a place\nof perfect stillness,\nwhere thoughts crystallize\nlike raindrops\nsuspended in time.\n\nI am the storm,\nI am the eye,\nI am the silence\nbetween the thunder\nand the light.\n\nIn this moment\nof absolute calm,\nI understand\nthat peace is not\nthe absence of chaos,\nbut the presence\nof acceptance.',
      'Within the chaos of the tempest, there exists a place of perfect stillness...',
      'David Kim',
      'David Kim explores themes of inner peace and philosophical reflection through nature metaphors.',
      philosophy_id,
      ARRAY['storm', 'peace', 'acceptance', 'philosophy'],
      false,
      true,
      18,
      156
    ),
    (
      'Love Letter to the Moon',
      E'Dear Luna,\n\nYou have been my constant companion\nthrough sleepless nights\nand whispered confessions.\nYour silver light\nhas illuminated my darkest hours\nand blessed my brightest dreams.\n\nI have watched you wax and wane,\na celestial reminder\nthat change is beautiful,\nthat cycles bring renewal,\nthat even in darkness\nthere is always light returning.\n\nWith eternal devotion,\nA grateful earthbound soul',
      'Dear Luna, You have been my constant companion through sleepless nights and whispered confessions...',
      'Amara Okafor',
      'Amara Okafor writes intimate poetry that bridges the personal and the cosmic.',
      love_id,
      ARRAY['moon', 'love', 'devotion', 'night'],
      true,
      true,
      42,
      298
    );

  -- Insert sample blog posts
  INSERT INTO blog_posts (title, content, excerpt, author_name, author_bio, category_id, tags, featured, published, reading_time, likes_count, views_count) VALUES
    (
      'The Art of Modern Poetry',
      E'# The Evolution of Contemporary Verse\n\nModern poetry has undergone a remarkable transformation over the past century. From the structured verses of traditional forms to the free-flowing expressions of contemporary poets, the art form continues to evolve and adapt to our changing world.\n\n## Breaking Traditional Boundaries\n\nToday''s poets are not bound by the rigid structures that once defined poetry. They experiment with form, rhythm, and language in ways that would have been unthinkable to poets of previous generations.\n\n## The Digital Age Influence\n\nSocial media and digital platforms have democratized poetry, allowing voices from all backgrounds to share their work with global audiences. This has led to an explosion of diverse perspectives and styles.\n\n## Finding Your Voice\n\nFor emerging poets, the key is not to imitate but to discover your unique voice. Draw from your experiences, your culture, your dreams, and your fears. Authenticity resonates more than technical perfection.',
      'Exploring how contemporary poets are reshaping the literary landscape through innovation and authentic expression...',
      'Inklet Editorial Team',
      'The Inklet Editorial Team consists of published poets, literary critics, and passionate advocates for contemporary poetry.',
      philosophy_id,
      ARRAY['modern poetry', 'writing', 'craft', 'contemporary'],
      true,
      true,
      8,
      67,
      423
    ),
    (
      'Finding Your Poetic Voice',
      E'# Discovering Your Unique Expression\n\nEvery poet begins their journey with the same question: "What do I have to say that hasn''t been said before?" The answer lies not in finding completely new topics, but in finding your unique way of seeing and expressing the world.\n\n## Start with What You Know\n\nYour experiences, no matter how ordinary they may seem, are uniquely yours. The way you see a sunset, experience heartbreak, or find joy in small moments is different from anyone else''s perspective.\n\n## Read Widely, Write Regularly\n\nExposure to different poets and styles will help you understand what resonates with you. But remember, reading is only half the equation. Regular writing practice is essential for developing your voice.\n\n## Embrace Vulnerability\n\nThe most powerful poetry often comes from our most vulnerable moments. Don''t be afraid to explore difficult emotions or challenging experiences in your work.',
      'A comprehensive guide for emerging poets on developing their unique style and authentic voice...',
      'Dr. Sarah Mitchell',
      'Dr. Sarah Mitchell is a professor of Creative Writing and the author of three poetry collections.',
      philosophy_id,
      ARRAY['writing advice', 'poetry', 'voice', 'craft'],
      true,
      true,
      12,
      89,
      567
    );
END $$;