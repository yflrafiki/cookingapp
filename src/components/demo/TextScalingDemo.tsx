'use client';

import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function TextScalingDemo() {
  const { textScaleMultiplier } = useAppContext();

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Text Scaling Demo</h1>
        <p className="text-lg text-muted-foreground">
          Current scaling: <Badge variant="secondary">{textScaleMultiplier}x</Badge>
        </p>
        <p className="text-sm text-muted-foreground">
          All text elements below scale proportionally with the global setting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Headings Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Headings</CardTitle>
            <CardDescription>Different heading sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-3xl font-bold">Heading 1 (text-3xl)</h1>
            <h2 className="text-2xl font-semibold">Heading 2 (text-2xl)</h2>
            <h3 className="text-xl font-medium">Heading 3 (text-xl)</h3>
            <h4 className="text-lg font-medium">Heading 4 (text-lg)</h4>
            <h5 className="text-base font-medium">Heading 5 (text-base)</h5>
            <h6 className="text-sm font-medium">Heading 6 (text-sm)</h6>
          </CardContent>
        </Card>

        {/* Body Text Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Body Text</CardTitle>
            <CardDescription>Different text sizes and weights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">Large body text (text-lg)</p>
            <p className="text-base">Regular body text (text-base)</p>
            <p className="text-sm">Small text (text-sm)</p>
            <p className="text-xs">Extra small text (text-xs)</p>
            <p className="text-base font-bold">Bold text</p>
            <p className="text-base italic">Italic text</p>
            <p className="text-base underline">Underlined text</p>
          </CardContent>
        </Card>

        {/* Interactive Elements Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
            <CardDescription>Buttons, inputs, and form elements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Primary Button</Button>
            <Button variant="secondary" className="w-full">Secondary Button</Button>
            <Button variant="outline" size="sm" className="w-full">Small Button</Button>
            <Input placeholder="Text input field" />
            <Input placeholder="Small input" className="text-sm" />
            <div className="flex gap-2">
              <Badge>Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mixed Content Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Mixed Content</CardTitle>
            <CardDescription>Real-world content example</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Recipe: Chocolate Chip Cookies</h3>
              <p className="text-sm text-muted-foreground">Prep time: 15 minutes | Cook time: 12 minutes</p>
              <div className="space-y-1">
                <p className="text-base font-medium">Ingredients:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• 2 cups all-purpose flour</li>
                  <li>• 1 cup butter, softened</li>
                  <li>• 3/4 cup brown sugar</li>
                  <li>• 1/2 cup white sugar</li>
                  <li>• 2 large eggs</li>
                  <li>• 2 tsp vanilla extract</li>
                  <li>• 1 tsp baking soda</li>
                  <li>• 1 tsp salt</li>
                  <li>• 2 cups chocolate chips</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p className="text-base font-medium">Instructions:</p>
                <ol className="text-sm space-y-1 ml-4">
                  <li>1. Preheat oven to 375°F (190°C)</li>
                  <li>2. Mix butter and sugars until creamy</li>
                  <li>3. Beat in eggs and vanilla</li>
                  <li>4. Combine flour, baking soda, and salt</li>
                  <li>5. Gradually add flour mixture to butter mixture</li>
                  <li>6. Stir in chocolate chips</li>
                  <li>7. Drop rounded tablespoons onto ungreased cookie sheets</li>
                  <li>8. Bake 9-11 minutes until golden brown</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Go to Settings to adjust the text scaling multiplier and see all text update dynamically!
        </p>
      </div>
    </div>
  );
}

